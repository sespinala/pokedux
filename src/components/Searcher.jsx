import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setSearchPokemonsText } from '../slices/dataSlice';

const Searcher = () => {
  const dispatch = useDispatch();

  const handleOnSearchValue = (value) => {
    dispatch(setSearchPokemonsText(value));
  };

  return (
    <Input.Search
      placeholder='Buscar... '
      style={{ marginBottom: 10 }}
      onSearch={handleOnSearchValue}
      allowClear
    />
  );
};

export { Searcher };
