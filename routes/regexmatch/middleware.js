import { Router } from "express";
import { query, validationResult } from "express-validator";
const router = Router();

router.get(
  "/routinematch",
  query("class1").isBoolean(),
  query("class2").isBoolean(),
  query("class3").isBoolean(),
  query("routineName").trim().escape().isLength({ min: 2, max: 12 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const routineName = req.query.routineName.toUpperCase().replace(/\s+/g, "");
    const obj = {
      class1: req.query.class1 === "true",
      class2: req.query.class2 === "true",
      class3: req.query.class3 === "true",
    };

    if (obj[determineClass(routineName)]) {
      res.status(200).json({ response: true });
    } else {
      res.status(200).json({ response: false });
    }

    function determineClass(str) {
      const string = str.toUpperCase().replace(/\s+/g, "");
      const patternClass3 = /^A[A-Z]/;
      const patternClass2 = /^R[1-4]/;

      switch (true) {
        case patternClass3.test(string):
          return "class3";
        case patternClass2.test(string):
          return "class2";
        default:
          return "class1";
      }
    }
  }
);

export default router;
