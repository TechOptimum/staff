import type {NextPage} from 'next';
import {Nav} from '../components/navbar/navbar';
import {Layout} from '../components/navbar/layout';
import StaffHome from '../components/hero';
import {Box} from '../components/styles/box';
import {Divider,} from "@nextui-org/react";

const Home: NextPage = () => {
   return (
      <Layout>
         <Nav />
         <Divider/>
         <Box as="main">
            <StaffHome />
         </Box>
      </Layout>
   );
};

export default Home;
