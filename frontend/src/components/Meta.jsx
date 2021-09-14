import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({
  title = "Zaiem Shop | Get Best Products at cheap price",
  description = "We give Best Deals for Each products and have unique discount for each product.",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Electronics, buy electronics, buy every thing, Great discounts."
      />
    </Helmet>
  );
};

export default Meta;
