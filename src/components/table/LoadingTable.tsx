import { LinearProgress, Skeleton, TableCell, TableRow } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

type TProps = {
  row?: number;
  column?: number;
  loading?: boolean;
}

export default function LoadingTable({ row = 10, column = 0, loading = true }: TProps) {
  const progressRef = useRef(null);
  const [isOnTop, setIsOnTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnTop(entry.isIntersecting);
      },
      {
        root: null, // viewport
        threshold: 0.1, // 10% visible = visible
      }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, [loading]);

  if (!loading) {
    return null
  }

  return (
    <>
      <TableRow ref={progressRef}>
        <TableCell colSpan={column} sx={{ padding: 0, height: 'auto' }}>
          <LinearProgress />
        </TableCell>
      </TableRow>
      {Array.from(Array(row)).map((_, rowIndex) => {
        return (
          <TableRow key={`tbRow-${rowIndex}`}>
            {Array.from(Array(column)).map((_, index) => (
              <TableCell align="left" key={`tbCell-${index}`}>
                <Skeleton />
              </TableCell>
            ))}
          </TableRow>
        );
      })}
      {!isOnTop && <TableRow>
        <TableCell colSpan={column} style={{ padding: 0 }}>
          <LinearProgress />
        </TableCell>
      </TableRow>}
    </>
  );
}