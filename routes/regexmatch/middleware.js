import { Router } from "express";
import { body, query, validationResult } from "express-validator";
import {escape, unescape} from 'html-escaper';
const router = Router();

router.get(
  "/routinematch",
  query("class1").isBoolean(),
  query("class2").isBoolean(),
  query("class3").isBoolean(),
  query("routineName").trim().escape().isLength({ min: 2, max: 12 }),
  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const routineName = req.query.routineName.toUpperCase();
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
      const string = str.toUpperCase();
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
router.post(
  "/routinematch",
  body("class1").isBoolean(),
  body("class2").isBoolean(),
  body("class3").isBoolean(),
  body("routineName").trim().escape().isLength({ min: 2, max: 12 }),
  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const routineName = req.body.routineName.toUpperCase();
    const obj = {
      class1: req.body.class1 === true,
      class2: req.body.class2 === true,
      class3: req.body.class3 === true,
    };

    if (obj[determineClass(routineName)]) {
      res.status(200).json({ response: true });
    } else {
      res.status(200).json({ response: false });
    }

    function determineClass(str) {
      const string = str.toUpperCase();
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
router.get(
  "/stringescape",
  query("string").trim().escape().isBase64(),
  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
      let escapeString = escape(Buffer.from(req.query.string, "base64").toString());
      res.status(200).json({ response: escapeString });
    }
    catch{
      return res.status(400).json({ response: "Could not base64Decode() 'string' parameter." });
    }
  }
);

export default router;
