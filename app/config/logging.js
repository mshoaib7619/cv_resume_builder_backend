global.cli = {
    log: console.log,
    info: console.info,
    error: console.error,
    warn: console.warn,
    logQuery: (log) => { console.info(`\n ${log} \n`); },
  };
  