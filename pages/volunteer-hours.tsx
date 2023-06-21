import type {NextPage} from 'next';
import {Nav} from '../components/navbar/navbar';
import {Layout} from '../components/navbar/layout';
import Teamtable from '../components/yourteam/teamtable';
import {Box} from '../components/styles/box';
import {Divider, Text} from "@nextui-org/react";

const Volunteer: NextPage = () => {
   return (
      <Layout>
         <Divider/>
         <Box style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "3rem auto",
        padding: "1em",
        boxSizing: "border-box",
      }} as="main">
        <Text css={{mb: "2rem"}} h2>
            Volunteer Hours
        </Text>
         <iframe style={{width: "100%", maxWidth: "500px", height: "1000px"}} src="https://docs.google.com/forms/d/e/1FAIpQLSeV5GDC_h3zav8CQEKYGFXj2QbmpEjivymPePNnEBB5L24LpQ/viewform?embedded=true" >Loading…</iframe>
         </Box>
      </Layout>
   );
};

export default Volunteer;
