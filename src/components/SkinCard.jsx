import PropTypes from "prop-types";

SkinCard.propTypes = {
  weapon: PropTypes.string,
  paint: PropTypes.number,
  seed: PropTypes.number,
  wear: PropTypes.number,
  name: PropTypes.string
}

export default function SkinCard({weapon, paint, seed, wear, name}) {
  return (
      <div>
        <p>weapon: {weapon}</p>
        <p>paint: {paint}</p>
        <p>seed: {seed}</p>
        <p>wear: {wear}</p>
        <p>name: {name}</p>
        <button onClick={() => {
          updateSkin.paint(weapon, 32)
        }}>tets</button>
      </div>
  );
}
