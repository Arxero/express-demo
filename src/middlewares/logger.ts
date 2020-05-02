function log(req: Request, res: Response, next: any) {
  console.log('Logging...');
  next();
}


module.exports = log;
