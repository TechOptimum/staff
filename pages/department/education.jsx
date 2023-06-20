import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { Text } from "@nextui-org/react";

import { NotionRenderer } from "react-notion";

export async function getStaticProps() {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/page/bdc38fa4b93d407e87d592da984e20b0"
  ).then(res => res.json());

  return {
    props: {
      blockMap: data
    }
  };
}

export default ({ blockMap }) => (
  <div style={{ maxWidth: 768, color: "white !important", margin: "auto" }}>
    <Text>
        <h2>Course Instructor Volunteer Handbook</h2>
    </Text>
    <NotionRenderer blockMap={blockMap} />
  </div>
);