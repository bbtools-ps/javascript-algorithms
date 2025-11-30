/**
 * Denomination values mapped to cents for precise calculations.
 * Keys are the actual currency values (e.g., 100 for $100 bill)
 * Values are the equivalent in cents (e.g., 10000 for $100 bill = 10,000 cents)
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
 * Map for quick lookup of denomination labels by their cent value
 * @type {Map<number, string>}
 */
const DENOMINATION_LABELS = new Map();

/**
 * Array of denomination values in cents, sorted from largest to smallest
 * @type {number[]}
 */
const DENOMINATIONS = [];

for (const key in DENOMINATION_VALUES) {
  DENOMINATIONS.push(DENOMINATION_VALUES[key]);
  DENOMINATION_LABELS.set(DENOMINATION_VALUES[key], key);
}
DENOMINATIONS.sort((a, b) => b - a);

/**
 * Cash register class that manages transactions and drawer contents.
 * Uses cent-based calculations to avoid floating-point precision errors.
 */
class CashRegister {
  /**
   * Creates a new cash register with initial funds
   * @param {Object.<string, number>} initialFunds - Object mapping denomination labels to quantities
   * @example
   * const register = new CashRegister({
   *   100: 5,   // 5 x $100 bills
   *   50: 10,   // 10 x $50 bills
   *   20: 20,   // 20 x $20 bills
   *   1: 50     // 50 x $1 bills
   * });
   */
  constructor(initialFunds) {
    this.funds = new Map();

    for (const key in initialFunds) {
      this.#addToDrawer(key, initialFunds[key]);
    }
  }

  /**
   * Private method to add funds to the drawer
   * @private
   * @param {string} key - The denomination label (e.g., "100" for $100 bill)
   * @param {number} amount - The quantity to add
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
   * Private method to remove funds from the drawer
   * @private
   * @param {Object.<string, number>} change - Object mapping denomination labels to quantities to remove
   * @throws {Error} If the denomination is invalid
   */
  #removeFromDrawer(change) {
    for (const key in change) {
      const amount = change[key];
      const fundKey = DENOMINATION_VALUES[key];

      if (!fundKey) throw new Error("Invalid denomination!");

      const fund = this.funds.get(fundKey);
      const newAmount = fund.amount - amount;
      this.funds.set(fundKey, { ...fund, amount: newAmount });
    }
  }

  /**
   * Private method to convert funds object to total cents
   * @private
   * @param {Object.<string, number>} funds - Object mapping denomination labels to quantities
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
   * Private method to calculate change using greedy algorithm
   * Attempts to make change using largest denominations first
   * @private
   * @param {Object.<string, number>} paidFunds - Funds paid by customer
   * @param {number} difference - Change amount needed in cents
   * @returns {{change: Object.<string, number>, remainingCents: number}} Object containing change breakdown and any remaining cents if exact change cannot be made
   */
  #makeChange(paidFunds, difference) {
    const change = {};
    let remainingCents = difference;

    const drawerContents = { ...this.getDrawerContents() };

    for (const key in paidFunds) {
      drawerContents[key] = (drawerContents[key] ?? 0) + paidFunds[key];
    }

    for (const value of DENOMINATIONS) {
      if (remainingCents === 0) break;

      const key = DENOMINATION_LABELS.get(value);
      const remainingAmount = drawerContents[key];

      if (!remainingAmount) continue;

      const idealCount = Math.floor(remainingCents / value);
      const countToUse = Math.min(idealCount, remainingAmount);

      if (countToUse > 0) {
        drawerContents[key] -= countToUse;
        remainingCents -= countToUse * value;
        change[key] = countToUse;
      }
    }

    return { change, remainingCents };
  }

  /**
   * Private method to add payment to drawer
   * @private
   * @param {Object.<string, number>} paidFunds - Funds paid by customer to add to drawer
   */
  #makePayment(paidFunds) {
    for (const key in paidFunds) {
      this.#addToDrawer(key, paidFunds[key]);
    }
  }

  /**
   * Process a transaction: validate payment, calculate change, and update drawer
   * @param {number} price - The price of the item in dollars
   * @param {Object.<string, number>} paidFunds - Object mapping denomination labels to quantities paid
   * @returns {string|undefined} Returns "Exact! Here you go." for exact payment, otherwise undefined
   * @throws {Error} If payment is insufficient or exact change cannot be made
   * @example
   * register.processTransaction(47, { 100: 1 });
   * // Processes transaction and gives back change
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

    const { change, remainingCents } = this.#makeChange(paidFunds, difference);

    if (remainingCents > 0) {
      throw new Error("Not enough cash in register");
    }

    this.#makePayment(paidFunds);
    this.#removeFromDrawer(change);
  }

  /**
   * Get the current contents of the cash drawer
   * @returns {Object.<string, number>} Object mapping denomination labels to quantities in drawer
   * @example
   * const contents = register.getDrawerContents();
   * console.log(contents); // { 100: 5, 50: 10, 20: 15, ... }
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
   * Get the total value of all funds in the drawer
   * @returns {number} Total value in dollars
   * @example
   * const total = register.getTotal();
   * console.log(total); // 1234.56
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

const cashRegister = new CashRegister({
  5000: 0,
  2000: 0,
  1000: 0,
  500: 0,
  200: 0,
  100: 0,
  50: 0,
  20: 0,
  10: 0,
  5: 0,
  2: 0,
  1: 0,
  0.5: 0,
  0.2: 0,
  0.1: 0,
  0.05: 0,
  0.01: 1,
});
try {
  cashRegister.processTransaction(3, { 1: 5 });
  cashRegister.processTransaction(5, { 1: 10 });
  // cashRegister.processTransaction(1, {1000: 1});
  const drawerContents = cashRegister.getDrawerContents();
  const total = cashRegister.getTotal();
  console.log(drawerContents, total);
} catch (error) {
  console.log(error);
}
