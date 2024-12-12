"use strict";
process.on('unhandledRejection', (reason) => {
    console.log(`Unhandled Rejection: ${reason.message || reason}`.red);
    throw new Error(reason.message || reason);
});
process.on('uncaughtException', (error) => {
    console.log(`Uncaught Exception: ${error.message}`.inverse);
});
//# sourceMappingURL=unhandledRejection.js.map