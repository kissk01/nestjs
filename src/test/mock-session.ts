export class MockSession {
  startTransaction() {
    // Mock startTransaction method
  }

  commitTransaction() {
    // Mock commitTransaction method
  }

  abortTransaction() {
    // Mock abortTransaction method
  }

  endSession() {
    // Mock endSession method
  }

  inTransaction() {
    // Provide a default implementation that returns false
    return false;
  }

  options: any = {};
}
