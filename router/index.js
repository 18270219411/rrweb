const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { isNull, isUndefined, } = require('lodash');
const router = require('express').Router();
const Event = require('../db/event');
const { generateUid, generateName } = require('../public/js/util');

router
  .get('/', (_, res) => {
    res.redirect('/events');
  })
  .get('/events', (req, res) => {
    // console.log('req query is ', req.query);
    const { userID, createAt } = req.query;

    const queryParam = {
      userID,
    }

    if (isNull(userID) || isUndefined(userID)) {
      delete queryParam.userID;
    }

    Event.find({ ...queryParam }).sort(createAt ? 'createAt' : '-createAt').then((result) => {
      const payload = result.map((i) =>
        Object.assign(
          {},
          {
            _id: i._id,
            userID: i.userID,
            path: i.path,
            status: i.status,
            name: i.name,
            createAt: moment(i.createAt).format('YYYY-MM-DD HH:mm:ss'),
          },
        ),
      );

      res.status(200).render('home', {
        code: 200,
        msg: 'ok',
        payload,
        allCount: payload.length,
      });
    }).catch((e) => {
      res.status(200).json({
        code: 500,
        msg: 'error',
        payload: e,
      });
    })
  })
  .get('/event/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(500).json({
        code: 500,
        msg: 'params is error',
      });
    }

    Event.findOne({ _id: id }).then((payload) => {
      if (payload) {
        fs.readFile(path.join(__dirname, `../events/${payload.fileName}.json`), { encoding: 'utf-8', }, (error, result) => {
          if (error) {
            return res.status(500).json({
              code: 500,
              msg: 'file read error',
              payload: error,
            });
          }

          res.status(200).json({
            code: 200,
            msg: 'ok',
            payload: result,
          });
        })
      } else {
        res.status(200).json({
          code: 200,
          msg: 'ok',
        });
      }

    }).catch((e) => {
      res.status(200).json({
        code: 500,
        msg: 'error',
        payload: e,
      });
    });
  })
  .post('/events', (req, res) => {
    const { userID } = req.query;

    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      const date = new Date().getTime();
      const fileName = moment(date).format('YYYY-MM-DD') + '-' + generateUid();
      fs.writeFileSync(path.join(__dirname, `../events/${fileName}.json`), data);

      Event.create({
        userID: isNull(userID) || isUndefined(userID) ? 0 : userID,
        path: date,
        name: generateName(),
        fileName,
      }).then(() => {
        res.status(200).json({
          code: 200,
          msg: 'ok',
        });
      }).catch((e) => {
        res.status(200).json({
          code: 500,
          msg: 'error',
          payload: e,
        });
      });
    });
  })
  .delete('/event/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(500).json({
        code: 500,
        msg: 'params is error',
      });
    }

    Event.findOne({ _id: id }).then((result) => {
      if (result) {
        Event.deleteOne({ _id: id }).then((delResult) => {
          if (!!delResult.deletedCount) {
            fs.rmSync(path.join(__dirname, `../events/${result.fileName}.json`));
            res.status(200).json({
              code: 200,
              msg: 'ok',
            })
          } else {
            res.status(500).json({
              code: 500,
              msg: 'delete file error',
            })
          }
        }).catch((e) => {
          res.status(500).json({
            code: 500,
            msg: 'error',
            payload: e,
          });
        })
      } else {
        res.status(500).json({
          code: 500,
          msg: 'file is not exist',
        });
      }
    }).catch((e) => {
      res.status(500).json({
        code: 500,
        msg: 'error',
        payload: e,
      });
    })



  })
  ;

module.exports = router;