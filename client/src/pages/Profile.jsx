import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER_AVATAR } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { Container, Typography, Box, Button, Input, Avatar, Card, CardContent, CircularProgress } from '@mui/material';
import { getAllDb, deleteDb } from '../utils/idb';

const ProfilePage = () => {
    const [recordings, setRec] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await getAllDb();
                setRec(data);
            } catch (err) {
                console.log('Error occurred when fetching recordings');
            }
        })();
    }, []);

    const { data, loading, error } = useQuery(QUERY_ME);
    const [updateUserAvatar] = useMutation(UPDATE_USER_AVATAR, {
        refetchQueries: [{ query: QUERY_ME }],
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;

    const { me } = data;

    if (!me) return <Typography>You need to be logged in to view this page.</Typography>;

    const handleFileChange = (event) => setSelectedFile(event.target.files[0]);

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!selectedFile) return setUploadError('No file selected');

        const formData = new FormData();
        formData.append('file', selectedFile);
        setUploading(true);
        setUploadError(null);

        try {
            const response = await fetch('http://localhost:3001/upload', { method: 'POST', body: formData });
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            await updateUserAvatar({ variables: { fileName: data.file.name } });
        } catch (error) {
            setUploadError('Upload or GraphQL error');
        } finally {
            setUploading(false);
        }
    };

    // Delete Recording Handler
    const handleDelete = async (id) => {
        try {
            await deleteDb(id); // Delete from IndexedDB
            setRec((prev) => prev.filter((recording) => recording.id !== id)); // Update state to remove recording
        } catch (error) {
            console.log('Error deleting recording:', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Box textAlign="center">
                        <Typography variant="h4" gutterBottom>{me.username ? `${me.username}'s Profile` : "Profile"}</Typography>
                        <Box mb={2}>
                            <Avatar 
                                src={me.avatar ? `http://localhost:3001/uploads/${me.avatar}` : ''} 
                                sx={{ width: 120, height: 120, mx: 'auto', bgcolor: 'grey.500' }}
                            >
                                {me.username ? me.username[0] : 'U'}
                            </Avatar>
                        </Box>
                        <Box mb={2}>
                            <Typography variant="h6">Email:</Typography>
                            <Typography>{me.email || 'Not available'}</Typography>
                        </Box>
                        <Box>
                            <Input type="file" onChange={handleFileChange} />
                            <Button variant="contained" onClick={handleUpload} sx={{ mt: 2 }} disabled={uploading}>
                                {uploading ? <CircularProgress size={24} /> : 'Upload Avatar'}
                            </Button>
                            {uploadError && <Typography color="error" sx={{ mt: 2 }}>{uploadError}</Typography>}
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <div>
                <Typography variant="h5" gutterBottom>Recordings</Typography>
                {recordings.length > 0 ? recordings.map((recording) => {
                    const audioBlob = new Blob(recording.recording.chunks, { type: 'audio/webm' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    
                    return (
                        <Box key={recording.id} display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                            <audio controls style={{ flex: 1 }}>
                                <source src={audioUrl} type="audio/ogg"/>
                                Your browser does not support the audio element.
                            </audio>
                            <Button 
                                variant="outlined" 
                                color="error" 
                                onClick={() => handleDelete(recording.id)}
                                sx={{ ml: 2 }}
                            >
                                Delete
                            </Button>
                        </Box>
                    );
                }) : (
                    <Typography>No recordings available.</Typography>
                )}
            </div>
        </Container>
    );
};

export default ProfilePage;
