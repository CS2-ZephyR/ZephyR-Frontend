import PropTypes from 'prop-types';

ErrorPage.propType = {
  error: PropTypes.string,
};

export default function ErrorPage({ error }) {
  return (
    <div className="flex items-center justify-center mt-64">
      <div className="text-center">
        <p className="text-2xl">{error}</p>
      </div>
    </div>
  );
}
