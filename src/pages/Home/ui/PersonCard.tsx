import { Avatar, Card, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PeopleWithId } from 'shared/api/swapiTypes';
import { routes } from 'shared/config';

export type PersonCardProps = Pick<PeopleWithId, 'id' | 'name'>;

const PersonCard = ({ id, name }: PersonCardProps) => {
  return (
    <LinkBox
      as={Card}
      display="flex"
      justifyContent="center"
      minH={40}
      bg="gray.50"
      textAlign="center"
      p={2}
      transitionDuration="fast"
      transitionTimingFunction="ease-out"
      _hover={{
        textDecoration: 'none',
        transform: 'translateY(-0.3rem)',
        boxShadow: 'xl',
      }}
    >
      <LinkOverlay as={Link} to={routes.person.replace(':id', String(id))}>
        <Avatar size="lg" />
        <Text fontSize="xl" color="purple.900" mt={4}>
          {name}
        </Text>
      </LinkOverlay>
    </LinkBox>
  );
};

export default PersonCard;
