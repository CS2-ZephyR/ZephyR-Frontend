import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { updateModel } from '../../redux/slices/skinSlice.js';

import agents from '../../constant/agents.json';
import axios from '../../utils/axios.js';

AgentCard.propTypes = {
  team: PropTypes.string,
  model: PropTypes.string,
};

export default function AgentCard({ team, model }) {
  const dispatch = useDispatch();

  const onModelChange = (e) => {
    const model = e.target.value;

    dispatch(updateModel({ team, model }));

    (async () => {
      await axios.put('/api/skin/model', { team, model });
    })();
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg p-6">
      <img
        className="w-auto h-36 object-cover object-center mx-auto"
        src={`/img/${model.replace('/', '_')}.png`}
        alt={model}
        draggable={false}
        onError={(event) => {
          event.currentTarget.src = '/img/none.png';
        }}
      />

      <div className="mt-4 text-xl font-bold">
        {team === 't' ? '테러리스트' : '카운터 테러리스트'}
      </div>

      <div className="mt-2">
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={model}
          onChange={onModelChange}
        >
          {Object.keys(agents[team]).map((group) => (
            <optgroup key={group} label={group}>
              {agents[team][group].map((detail) => (
                <option key={detail.model} value={detail.model}>
                  {detail.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}
