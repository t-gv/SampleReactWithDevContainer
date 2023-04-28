import {useEffect, useState} from 'react';
import './App.css';
import { DataGridPro, GridColDef, GridPaginationModel, GridPagination  } from '@mui/x-data-grid-pro';

function App() {
  const [data, setData] = useState<any[]>([]);
  const [pageSize, setCount] = useState(0);
  const [images, setImages] = useState([]);
  const columns: GridColDef[] = [
    { field: 'description', headerName: 'Description', width: 300, editable: true  },
    { field: 'types', headerName: 'Types', width: 150, editable: true  },
    { field: 'topics', headerName: 'Sujets', width: 150, editable: true  },
    { field: 'levels', headerName: 'Niveaux', width: 150, editable: true  },
  ];
 
  const getData = async () => {
    const resp = await fetch('https://api.sampleapis.com/codingresources/codingResources');
    const json = await resp.json() as any[];
    var data = [];
    
    for (const item of json) {
      data.push({id:item.id, description:item.description, types: JSON.stringify(item.types),topics: JSON.stringify(item.topics), levels: JSON.stringify(item.levels) }) 
    }
    
    setData(data);

  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <div className="App">
      <div style={{ height: 500, width: '100%' }}>
        <DataGridPro 
        rows={data} 
        columns={columns}  
        initialState={{ 
          pinnedColumns: { left: ['description'] },
          pagination: { paginationModel: { pageSize: 5 } }
        }}      
        pageSizeOptions={[5,10,25]}
        getDetailPanelContent={({ row }) => <div>Row ID: {row.id}</div>}
        getDetailPanelHeight={({ row }) => 'auto'}
        
        />
      </div>
    </div>
  );
}

export default App;
