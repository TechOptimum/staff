import type {NextPage} from 'next';
import {Nav} from '../components/navbar/navbar';
import {Layout} from '../components/navbar/layout';
import Teamtable from '../components/yourteam/teamtable';
import {Box} from '../components/styles/box';
import {Divider} from "@nextui-org/react";

const Team: NextPage = () => {
   return (
      <Layout>
        
         <Divider/>
         <Box as="main">
            <Teamtable />
         </Box>
      </Layout>
   );
};

export default Team;
