import React, { useEffect, useState } from "react";
import { useResource } from "../hooks/Resource"

export const ResourcesTestComponent = () => {
   const posts = useResource("posts")
   const person = useResource("person")

   
   return <React.Fragment>
      <button onClick={() => posts.fetchResource()}> FETCH POSTS</button>
      <button onClick={() => posts.createResource({ name: "testResource" })}> CREATE POSTS</button>
      <button onClick={() => posts.updateResource(1,{ name: "testResource" })}> UPDATE POSTS</button>
      <button onClick={() => posts.deleteResource(1)}> DELETE POSTS</button>
      <br></br>
      <button onClick={() => person.fetchResource()}>person FETCH</button>
      <button onClick={() => person.createResource({ name: "testResource" })}>person CREATE</button>
      <button onClick={() => posts.updateResource(1,{ name: "testResource" })}>UPDATE person</button>
      <button onClick={() => person.deleteResource(1)}>person DELETE</button>
   </React.Fragment>
}