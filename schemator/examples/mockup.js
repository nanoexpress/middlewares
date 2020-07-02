export default async (req) => {
  // Simple implementation for `headers` middleware
  req.headers = {};
  req.forEach((key, value) => {
    req.headers[key] = value;
  });

  // TODO: Mock data
  req.body = '{"email":"foo@bar.baz"}';
};
