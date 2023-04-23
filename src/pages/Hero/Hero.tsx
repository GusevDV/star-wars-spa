import { Card, Divider, Flex, Heading, Skeleton, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { swapi } from 'shared/api';

export const Hero = () => {
  const { id } = useParams();
  const { data, isLoading } = swapi.useGetHeroByIdQuery(id as string);

  return (
    <>
      <Skeleton isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
        <Text as="sup">created: {data?.created}</Text>
        <Text as="sup">edited: {data?.edited}</Text>
      </Skeleton>
      <Divider />
      <Flex>
        <Card>Eye color {data?.eye_color}</Card>
        <Card>Birth year {data?.birth_year}</Card>
        <Card>Gender {data?.gender}</Card>
        <Card>Eye color {data?.eye_color}</Card>
        <Card>Hair color {data?.hair_color}</Card>
        <Card>Height {data?.hair_color}</Card>
        <Card>Mass {data?.mass}</Card>
        <Card>Skin color {data?.skin_color}</Card>
      </Flex>
    </>
  );
};
export default Hero;
