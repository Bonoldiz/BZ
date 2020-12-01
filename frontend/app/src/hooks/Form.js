import React, { useState, useEffect } from 'react';

export function useForm() {
   const [formInputs,setFormInputs] = useState([])
   const [staticValues, setStaticValues] = useState({})
   const [values, setValues] = useState({})

   const _registerToEvent = inputRef => {
      if (inputRef && !formInputs.includes(inputRef.name)) 
         setFormInputs([...formInputs,inputRef.name])

         inputRef.oninput = (a) => {
            let inputValue = {}
            inputValue[a.target.name] = a.target.value
            if ({ ...values, ...inputValue } != values)
               setValues(() => ({ ...values, ...inputValue }))
         }
   }


   /**
    * Handles custom input registration and vales 
    * @param {object} input the input component name,type and event
    */
   const handleCustomInputs = (input) => {
      if (!input.name)
         return;

      let newValue = {}

      switch (input.event) {
         case "register":
            newValue[input.name] = []
            setValues(() => ({ ...values, ...newValue }))
            break;
         case "set_value":
            newValue[input.name] = input.value
            setValues(() => ({ ...values, ...newValue }))

            break;
      }
   }

   /**
    * Add an input element to the form array and track its values 
    * @method addInput
    * @memberof useFormHook
    * 
    * @param input - the input element to register
    */
   const addInput = (input) => {
      if (input) {
         switch (input.type) {
            case 'custom':
               handleCustomInputs(input)
               break;
            case 'button':
            case 'submit':
               input.onclick = function (e) {
                  e.preventDefault()
               }
               break;
            default:
               _registerToEvent(input)

         }
      }
   }

   /**
    * Merge form inputs values with static data
    * @method addStaticValues
    * @memberof useFormHook
    * 
    * @param {Object} staticValue - Values to append to the form values statically 
    */
   const addStaticValues = (staticValue) => {
      if (Object.getPrototypeOf(staticValue) !== Object.prototype) {
         return
      }

      setStaticValues(_oldStaticValues => { return ({ ..._oldStaticValues, ...staticValue }) })
   }

   return { addStaticValues, register: addInput, values: { ...values, ...staticValues } }
}
