import { Center } from '@chakra-ui/react';
import { FC, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Throbber from 'shared/ui/Throbber';

const withRouter = (Component: FC) => () =>
  (
    <BrowserRouter>
      <Suspense
        fallback={
          <Center h="100vh">
            <Throbber />
          </Center>
        }
      >
        <Component />
      </Suspense>
    </BrowserRouter>
  );

export default withRouter;
