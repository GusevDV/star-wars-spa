import { Card, Text } from '@chakra-ui/react';

export type HeroPropertyProps = {
  name: string;
  value: string | number;
};
const PeopleProperty = ({ name, value }: HeroPropertyProps) => {
  return (
    <Card bg="gray.50" display="flex" px={5} py={4} justifyContent="start">
      <Text fontSize="sm">{name}</Text>
      <Text fontSize="xl">{value}</Text>
    </Card>
  );
};

export default PeopleProperty;
