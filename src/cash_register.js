/**
 * Maps currency denominations (in currency units) to their values in cents.
 * Keys represent the denomination in currency units, values represent the equivalent in cents.
 * This allows for precise calculations without floating-point errors.
 * @type {Object.<number, number>}
 */
const DENOMINATION_VALUES = {
  5000: 500000,
  2000: 200000,
  1000: 100000,
  500: 50000,
  200: 20000,
  100: 10000,
  50: 5000,
  20: 2000,
  10: 1000,
  5: 500,
  2: 200,
  1: 100,
  0.5: 50,
  0.2: 20,
  0.1: 10,
  0.05: 5,
  0.01: 1,
};

/**
 * Array of all denomination values in cents, sorted from largest to smallest.
 * Used for making change efficiently by trying larger denominations first.
 * @type {number[]}
 */
const DENOMINATIONS = [];
for (const key in DENOMINATION_VALUES) {
  DENOMINATIONS.push(DENOMINATION_VALUES[key]);
}
DENOMINATIONS.sort((a, b) => b - a);

/**
 * Cash register class for managing transactions and drawer funds.
 * Handles payment processing, change calculation, and drawer management.
 */
class CashRegister {
  /**
   * Creates a new cash register with initial funds.
   * @param {Object.<string, number>} initialFunds - Object mapping denomination labels to their counts
   * @example
   * const register = new CashRegister({ 100: 5, 50: 10, 20: 20 });
   */
  constructor(initialFunds) {
    this.funds = new Map();

    for (const key in initialFunds) {
      this.#addToDrawer(key, initialFunds[key]);
    }
  }

  /**
   * Adds bills/coins of a specific denomination to the cash drawer.
   * @private
   * @param {string} key - The denomination label (e.g., "100", "0.5")
   * @param {number} amount - The count of bills/coins to add
   * @throws {Error} If the denomination is invalid
   */
  #addToDrawer(key, amount) {
    const fundKey = DENOMINATION_VALUES[key];

    if (!fundKey) throw new Error("Invalid denomination!");

    const currentAmount = this.funds.get(fundKey)?.amount ?? 0;
    this.funds.set(DENOMINATION_VALUES[key], {
      label: key,
      value: DENOMINATION_VALUES[key],
      amount: currentAmount + amount,
    });
  }

  /**
   * Removes bills/coins of a specific denomination from the cash drawer.
   * @private
   * @param {string} key - The denomination label (e.g., "100", "0.5")
   * @param {number} amount - The count of bills/coins to remove
   * @throws {Error} If the denomination is invalid
   */
  #removeFromDrawer(key, amount) {
    const fundKey = DENOMINATION_VALUES[key];

    if (!fundKey) throw new Error("Invalid denomination!");

    const fund = this.funds.get(fundKey);
    const newAmount = fund.amount - amount;

    this.funds.set(fundKey, { ...fund, amount: newAmount });
  }

  /**
   * Converts a collection of denominations and their counts to total cents.
   * @private
   * @param {Object.<string, number>} funds - Object mapping denomination labels to counts
   * @returns {number} Total value in cents
   */
  #convertToCents(funds) {
    let total = 0;

    for (const key in funds) {
      const cents = DENOMINATION_VALUES[key] ?? 0;

      if (cents > 0) {
        total += cents * funds[key];
      }
    }

    return total;
  }

  /**
   * Rolls back a transaction by restoring the drawer to its previous state.
   * Used when unable to make proper change.
   * @private
   * @param {Object.<string, number>} drawerContents - The previous drawer state
   * @param {Object.<string, number>} paidFunds - The funds that were paid
   */
  #rollbackTransaction(drawerContents, paidFunds) {
    for (const key in paidFunds) {
      this.#removeFromDrawer(key, paidFunds[key]);
    }
    for (const key in drawerContents) {
      const fundKey = DENOMINATION_VALUES[key];
      const fund = this.funds.get(fundKey);
      const previousAmount = drawerContents[key];
      this.funds.set(fundKey, { ...fund, amount: previousAmount });
    }
  }

  /**
   * Adds paid funds to the cash drawer.
   * @private
   * @param {Object.<string, number>} paidFunds - Object mapping denomination labels to counts
   */
  #makePayment(paidFunds) {
    for (const key in paidFunds) {
      this.#addToDrawer(key, paidFunds[key]);
    }
  }

  /**
   * Processes a transaction, calculating change and updating the drawer.
   * Uses a greedy algorithm to provide change using the largest denominations first.
   * @param {number} price - The price of the purchase in currency units
   * @param {Object.<string, number>} paidFunds - Object mapping denomination labels to counts paid by customer
   * @returns {string|Object.<string, number>} "Exact! Here you go." if exact payment, otherwise an object mapping denomination labels to counts for change
   * @throws {Error} If payment is insufficient or if unable to make proper change
   * @example
   * const change = register.processTransaction(5, { 10: 1 }); // Returns change for 10 - 5
   */
  processTransaction(price, paidFunds) {
    const paidCents = this.#convertToCents(paidFunds);
    const priceCents = price * 100;
    let difference = paidCents - priceCents;

    if (difference < 0) {
      throw new Error(`${Math.abs(difference) / 100} needed.`);
    }
    if (difference === 0) {
      this.#makePayment(paidFunds);
      return "Exact! Here you go.";
    }

    const drawerContents = this.getDrawerContents();
    this.#makePayment(paidFunds);

    let remainingCents = difference;
    const result = {};

    for (const value of DENOMINATIONS) {
      if (remainingCents === 0) break;

      const fund = this.funds.get(value);
      if (!fund || fund.amount === 0) continue;

      const idealCount = Math.floor(remainingCents / value);
      const available = fund.amount;
      const countToUse = Math.min(idealCount, available);

      if (countToUse > 0) {
        this.#removeFromDrawer(this.funds.get(value).label, countToUse);
        remainingCents -= countToUse * value;
        result[fund.label] = countToUse;
      }
    }

    if (remainingCents > 0) {
      this.#rollbackTransaction(drawerContents, paidFunds);
      throw new Error("Not enough cash in register");
    }

    return result;
  }

  /**
   * Gets the current contents of the cash drawer.
   * @returns {Object.<string, number>} Object mapping denomination labels to their counts (excludes zero amounts)
   */
  getDrawerContents() {
    const contents = {};

    for (const [_value, { amount, label }] of this.funds.entries()) {
      if (amount > 0) {
        contents[label] = amount;
      }
    }

    return contents;
  }

  /**
   * Calculates the total value of all funds in the cash drawer.
   * @returns {number} Total value in currency units
   */
  getTotal() {
    let total = 0;

    for (const [_value, { amount, value }] of this.funds.entries()) {
      if (amount > 0) {
        total += amount * value;
      }
    }

    return total / 100;
  }
}

// const cashRegister = new CashRegister({
//   5000: 0,
//   2000: 0,
//   1000: 0,
//   500: 0,
//   200: 0,
//   100: 0,
//   50: 0,
//   20: 0,
//   10: 0,
//   5: 0,
//   2: 0,
//   1: 0,
//   0.5: 0,
//   0.2: 0,
//   0.1: 0,
//   0.05: 0,
//   0.01: 1,
// });
// try {
//   cashRegister.processTransaction(3, { 1: 3 });
//   cashRegister.processTransaction(5, { 1: 10 });
//   // cashRegister.processTransaction(1, {1000: 1});
//   const drawerContents = cashRegister.getDrawerContents();
//   const total = cashRegister.getTotal();
//   console.log(drawerContents, total);
// } catch (error) {
//   console.log(error);
// }
