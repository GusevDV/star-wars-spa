import { Card, Text } from '@chakra-ui/react';

export type HeroPropertyProps = {
  name: string;
  value: string | number;
};
const PeopleProperty = ({ name, value }: HeroPropertyProps) => {
  return (
    <Card>
      <Text fontSize="sm">{name}</Text>
      <Text fontSize="lg">{value}</Text>
    </Card>
  );
};

export default PeopleProperty;
