import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { Text } from "@nextui-org/react";
import { NotionRenderer } from "react-notion";

export async function getStaticProps() {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/page/c005396a64804424945e245223b2ae4a"
  ).then(res => res.json());

  return {
    props: {
      blockMap: data
    }
  };
}

const CommunityHandbook = ({ blockMap }) => (
  <div style={{ maxWidth: 768, color: "white !important", margin: "auto" }}>
    <Text>
        <h2>Community Volunteer Handbook</h2>
    </Text>
    <NotionRenderer blockMap={blockMap} />
  </div>
);

CommunityHandbook.displayName = 'CommunityHandbook';

export default CommunityHandbook;
