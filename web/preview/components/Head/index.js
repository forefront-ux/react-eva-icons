import NextHead from 'next/head';
import PropTypes from 'prop-types';

function Head(props) {
  const { description = 'Make it easier to use Eva Icons in your projects.', title = 'React Components for Eva Icons - Made by Forefront-UX' } = props;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ForefrontU" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://react-eva-icons.forefront-ux.dev/static/brand.png" />
      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta
        property="og:url"
        content={`https://react-eva-icons.forefront-ux.dev`}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://react-eva-icons.forefront-ux.dev/static/brand.pn" />
      <meta property="og:ttl" content="604800" />
    </NextHead>
  );
}

Head.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string
};

export default Head;
