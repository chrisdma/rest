import { Router } from 'express';
const router = Router();

router.get('/routinematch', (req, res) => {
  const validProperties = ["class1", "class2", "class3", "routineName"]
  const validRequest = validProperties.every(prop => req.query.hasOwnProperty(prop));
  if (validRequest){
    const routineName = req.query.routineName.toUpperCase().replace(/\s+/g, '')
    const obj = {
      class1: (req.query.class1 === "true"),
      class2: (req.query.class2 === "true"),
      class3: (req.query.class3 === "true")
    }

    if (obj[determineClass(routineName)]){
      res.status(200).json({response: true});
    }
    else{
      res.status(200).json({response: false});
    }
  }
  else{
    res.status(500).json({message: "Invalid API request."});
  }

  function determineClass(str) {
    const string = str.toUpperCase().replace(/\s+/g, '');
    const patternClass3 = /^A[A-Z]/;
    const patternClass2 = /^R[1-4]/;

    switch (true) {
      case (patternClass3.test(string)):
        return "class3";
      case (patternClass2.test(string)):
        return "class2";
      default:
        return "class1";
    }
  };
});

export default router;