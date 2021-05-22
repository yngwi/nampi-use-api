import { useAspects } from "nampi-use-api/bundle";
import React, { useState } from "react";
import { ItemListPage } from "../ItemListPage";

export const Aspects = () => {
  const [text, setText] = useState<string>("");
  const [type, setType] = useState<string>("");
  const itemData = useAspects({
    query: { orderBy: "label", text, type },
  });
  return (
    <ItemListPage
      baseClass="https://purl.org/nampi/owl/core#aspect"
      itemData={itemData}
      onClassChange={setType}
      onTextChange={setText}
      title="Aspects"
      urlPart="aspect"
    />
  );
};
