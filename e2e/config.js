const allowedEnvs = ['local', 'dev', 'qa', 'perf', 'prod'];
export default env => {
  if (!allowedEnvs.includes(env)) {
    throw new Error(
      `Unsupported enviornment supplied ${env} please use one of the allowed values.`,
    );
  }
};
