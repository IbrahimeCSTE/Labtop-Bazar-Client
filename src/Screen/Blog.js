import React from "react";

const Blog = () => {
  return (
    <div className="max-h-screen-lg">
      <div className="mb-10 dark:bg-gray-800 dark:text-gray-100 py-5">
        <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-900">
          <div className="mt-3 mb-10">
            <h1 className="text-2xl font-bold hover:underline">
              {" "}
              What are the different ways to manage a state in a React
              application?
            </h1>
            <p className="mt-2">
              Are you facing difficulties in making loading spinners or a pop-up
              appears at the right time? It can be because of an unmanaged state
              in React. A state is a JavaScript object. It stores a component’s
              dynamic data and determines the component’s behavior. In other
              words, it is the interface between any data of changes (backend or
              local) and the representation of this data with UI elements in the
              frontend.
            </p>
          </div>
          <div className="mt-3 mb-10">
            <h1 className="text-2xl font-bold hover:underline">
              {" "}
              How does prototypical inheritance work?
            </h1>
            <p className="mt-2">
              The Prototypal Inheritance is a feature in javascript used to add
              methods and properties in objects. It is a method by which an
              object can inherit the properties and methods of another object.
              Traditionally, in order to get and set the [[Prototype]] of an
              object, we use Object. getPrototypeOf and Object.
            </p>
          </div>
          <div className="mt-3 mb-10">
            <h1 className="text-2xl font-bold hover:underline">
              What is a unit test? Why should we write unit tests?
            </h1>
            <p className="mt-2">
              The main objective of unit testing is to isolate written code to
              test and determine if it works as intended. Unit testing is an
              important step in the development process, because if done
              correctly, it can help detect early flaws in code which may be
              more difficult to find in later testing stages.
            </p>
          </div>
          <div className="mt-3 mb-10">
            <h1 className="text-2xl font-bold hover:underline">
              React vs. Angular vs. Vue?
            </h1>
            <p className="mt-2">
              Vue provides higher customizability and hence is easier to learn
              than Angular or React. Further, Vue has an overlap with Angular
              and React with respect to their functionality like the use of
              components. Hence, the transition to Vue from either of the two is
              an easy option.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
