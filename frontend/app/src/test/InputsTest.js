import React, { useEffect } from 'react';
import { useForm } from '../hooks/Form';
import { PropertiesInput } from './PropertyInput';
import { Row } from '../components/DOM/Row';

export const InputTestComponent = () => {
   const { addInput: register, getValues, addStaticValues } = useForm({ staticValues: { ID: 8080 } });

   useEffect(() => {
      addStaticValues({ ID: 8080, SUPERIMPORTANTSTATICVALUE: "TOP" })
   }, [])

   return (
      <React.Fragment>
         <h2>CUSTOM INPUTS</h2>

         <PropertiesInput name="testProps2" register={register}></PropertiesInput>

         <Row card>
            <div small>AAA</div>
            <div small>AAA</div>
            <div small>AAA</div> 
         </Row>

         <h2>CLASSIC INPUTS</h2>
         <form>
            <div className='form-group'>
               <hr></hr>
               <div>
                  <h3>INPUT TYPE TEXT</h3>

                  <input type='text' name='textInput' className='form-control clear' ref={register} defaultValue='textInput' />
               </div>
               <hr></hr>
               <div>
                  <h3>INPUT TYPE PASSWORD</h3>

                  <input type='password' name='passwordInput' className='form-control clear' ref={register} defaultValue='passwordInput' />
               </div>
               <hr></hr>
               <div>
                  <h3>INPUT TYPE NUMBER</h3>

                  <input type='number' name='numberInput' className='form-control clear' ref={register} defaultValue='numberInput' />
               </div>
               <hr></hr>
               <div>
                  <h3>INPUT TYPE URL</h3>

                  <input type='url' name='urlInput' className='form-control clear' ref={register} defaultValue='urlInput' placeholder="http://example.com" />
               </div>
               <hr></hr>
               <div>

                  <h3>INPUT TYPE TELEPHONE</h3>

                  <input type='tel' name='telInput' className='form-control clear' ref={register} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
               </div>
               <hr></hr>
               <div>
                  <h3>INPUT TYPE SEARCH</h3>

                  <input type='search' name='searchInput' className='form-control clear' ref={register} defaultValue='searchInput' placeholder="cake" />
               </div>
               <hr></hr>
               <div>
                  <h3>INPUT TYPE EMAIL</h3>

                  <input type='email' name='emailInput' className='form-control clear' ref={register} defaultValue='emailInput' />
               </div>
               <hr></hr>
               <div>
                  <h3>INPUT TYPE DATE</h3>
               Start date:<input type="date" name="dateInput" ref={register} /><br />
               Select date & time: <input type="datetime-local" name="datetimeInput" ref={register} /> <br />
               </div>


               <hr></hr>
               <div>
                  <h3>INPUT TYPE SELECT</h3>
                  <select name='selectInput' className='form-control' ref={register} defaultValue='5'>
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>
                  </select>
               </div>
               <hr></hr>
               <div>
                  <h3>INPUT TYPE RADIO</h3>

                  <input type="radio" name="radioInput" value="red" ref={register} /> Red <br />
                  <input type="radio" name="radioInput" value="blue" ref={register} /> blue <br />
                  <input type="radio" name="radioInput" value="green" ref={register} />green <br />
                  <input type="radio" name="radioInput" value="pink" ref={register} />pink <br />
               </div>
               <hr></hr>

               <div>
                  <h3>INPUT TYPE COLOR</h3>
                  <input type="color" name="colorInput" value="#a52a2a" ref={register} /> Select the color<br />
               </div>
               <hr></hr>


               <div>
                  <h3>INPUT TYPE CHECK</h3>
                  <div className='form-check'>
                     <input className='form-check-input' type='checkbox' id='checkUno' name='checkUno' ref={register} defaultChecked={true} />
                     <label className='form-check-label' htmlFor='checkUno' >
                        Test check
                    </label>
                  </div>
               </div>

               <hr></hr>
               <div>
                  <h3>INPUT TYPE FILE</h3>
                  <div className="form-group">
                     <input type="file" className="form-control-file" name="fileInput" id="fileInput" ref={register} />
                     <label htmlFor="fileInput">
                        <span>Upload FILE</span>
                     </label>
                  </div>
               </div>
               <hr></hr>
               <div>
                  <h3>INPUT TYPE FILE</h3>
                  <div className="form-group">
                     <input type="image" className="form-control-file" name="imageInput" id="imageInput" ref={register} />
                     <label htmlFor="imageInput">
                        <span>Upload IMAGE</span>
                     </label>
                  </div>
               </div>
               <hr></hr>
               <button type='button' onClick={() => { console.log(getValues()) }} className='btn btn-success' ref={register}>VALUES</button>
            </div>
         </form >
      </React.Fragment>

   );
}

