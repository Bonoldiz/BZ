import React, { useEffect } from 'react';
import notie from 'notie'
import { withIcon } from '../utils/withIcon';


export const AlertsTestComponent = () => {
   
   return (
      <React.Fragment>
         <button onClick={() => notie.alert(withIcon({text:'SUCCESS',type:'success',time:1000}))}>ASDSAD</button>
         <button onClick={() => notie.alert(withIcon({text:'WARNING',type:'warning'}))}>ASDSAD</button>
         <button onClick={() => notie.alert(withIcon({text:'INFO',type:'info'}))}>ASDSAD</button>
         <button onClick={() => notie.alert(withIcon({text:'ERROR',type:'error'}))}>ASDSAD</button>
      </React.Fragment>
   );
}

