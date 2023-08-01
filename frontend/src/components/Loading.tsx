import Box from '@mui/material/Box/Box';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

const Loading = () => {
  return (
    <Box className="my-40 m-auto" sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress className="w-40" />
    </Box>
  );
};

export default Loading;
