import { Box, CircularProgress } from '@mui/material';
import React from 'react'

type LoadingProps = {
  loading: boolean;
}
const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <>
      {
        loading && <Box
          sx={{
            position: 'absolute',
            top: '0%',
            left: '0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={32} />
        </Box>
      }
    </>
  )
}

export default Loading
