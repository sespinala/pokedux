import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { StarButton } from './StarButton';
import { setFavorite } from '../actions';
import { useDispatch } from 'react-redux';

const PokemonCard = ({ name, image, types, id, favorite }) => {
  const dispatch = useDispatch();
  const typesString = types.map((element) => element.type.name).join(', ');

  const handleOnFavorite = () => {
    dispatch(setFavorite({ pokemonId: id }));
  };

  return (
    <Card
      title={name}
      cover={
        <img
          src={image}
          alt={name}
        />
      }
      extra={
        <StarButton
          isFavorite={favorite}
          onClick={handleOnFavorite}
        />
      }
    >
      <Meta description={typesString} />
    </Card>
  );
};

export { PokemonCard };
