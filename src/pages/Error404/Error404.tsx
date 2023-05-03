import Error, { ErrorCodes } from 'widgets/Error';

const Error404 = () => {
  return <Error code={ErrorCodes.NotFound} />;
};

export default Error404;
