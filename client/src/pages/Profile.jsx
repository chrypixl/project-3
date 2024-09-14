import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Container, Typography, Avatar, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';

const ProfilePage = () => {
  const { data, loading, error } = useQuery(QUERY_ME);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const { me } = data;

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" sx={{ mt: 4 }}>
        {me.username}'s Profile
      </Typography>

      {/* {me.recordings.length > 0 && (
        <List>
          {me.recordings.map((recording) => (
            <ListItem key={recording._id}>
              <ListItemAvatar>
                <Avatar>{recording.recordingAuthor[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={recording.recordingAuthor}
                secondary={`Created on ${new Date(recording.createdAt).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      )} */}
    </Container>
  );
};

export default ProfilePage;
