import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { makeStyles } from "@mui/styles";
import { uuid } from "../../utils/helpers";

const useStyles = makeStyles(() => ({
  root: {
    '& td ': {
      color: '#141C4C',
      fontFamily: "RedHatDisplay Medium",
    },
  },

  tr: {
    '& td:first-child ': {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
    '& td:last-child ': {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    },
  },
}));

interface Props {
  cols: any;
  data: any[];
}

const CommonTable: React.FC<Props> = ({ data, cols }) => {
  const classes = useStyles();
  const width = typeof window !== 'undefined' ? window.innerWidth : null as any

  return (
    <TableContainer
      elevation={0}
      component={Paper}
      sx={{ borderRadius: '0.5rem', backgroundColor: 'white', alignItems: 'center' }}
    >
      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none',
          },
          minWidth: 650,
          border: '1px solid #E7E8ED',
          borderCollapse: 'separate',
          borderSpacing: width < 768 ? '0px 3px' : '0px 20px',
          px: '24px',
          borderRadius: '8px',
          '& .MuiTableCell-head': {
            padding: 0,
          },
        }}
        className={classes.root}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow>
            {cols.map((headerItem: any, index: number) => (
              <TableCell align='center' sx={{ color: '#5B6082', fontSize: '0.8rem', fontFamily: "RedHatDisplay Medium" }} key={index}>
                {headerItem.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: any) => (
            <TableRow
              key={uuid()}
              sx={{ height: '16px', backgroundColor: '#F1F4F8', color: '#141C4C' }}
              className={classes.tr}
            >
              {cols.map((col: any) => (
                <TableCell align="center" key={uuid()} sx={{ fontSize: '0.8rem', color: '#141C4C' }}>
                  <div className="font-redHatDisplayMedium">
                    {col.render(item)}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
