/*
COMP90024 Project 2 2023
Contributer
Aobo Li              1172339
Pavith Samarakoon    1297058
Zhihao Liang         1367102
Jiqiang Chen         1171420
Yijun Liu            1132416
*/
import React from "react";


export default function LogRegression() {
    // Our training set (X,Y).
    const X = new Matrix([[0, -1], [1, 0], [1, 1], [1, -1], [2, 0], [2, 1], [2, -1], [3, 2], [0, 4], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5], [3, 4], [1, 10], [1, 12], [2, 10], [2, 11], [2, 14], [3, 11]]);
    const Y = Matrix.columnVector([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2]);
    
    // The test set (Xtest, Ytest).
    const Xtest = new Matrix([
    [0, -2],
    [1, 0.5],
    [1.5, -1],
    [1, 2.5],
    [2, 3.5],
    [1.5, 4],
    [1, 10.5],
    [2.5, 10.5],
    [2, 11.5],
    ]);
    const Ytest = Matrix.columnVector([0, 0, 0, 1, 1, 1, 2, 2, 2]);
    
    // We will train our model.
    const logreg = new LogisticRegression({ numSteps: 1000, learningRate: 5e-3 });
    logreg.train(X, Y);
    
    // We try to predict the test set.
    const finalResults = logreg.predict(Xtest);
    
    // Now, you can compare finalResults with the Ytest, which is what you wanted to have.
    console.log(finalResults)
}