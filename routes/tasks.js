const { body, param, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter');

module.exports = app => {
    const Tasks = app.db.models.Tasks;
    app.route('/tasks')
        .all(app.auth.authenticate())
      .get(async (req, res) => {
          try {
            const tasks = await Tasks.findAll({
                where: {
                    user_id: req.user.id
                }
            });
            res.json(tasks);
          } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Unexpected error'});
          }

       })

      .post([
          body('title', 'Required field').exists(),
          body('title', 'Invalid length').trim().isLength({min: 1, max: 255})
      ], async (req, res) => {
          try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }

            let task = matchedData(req);
            task.user_id = req.user.id;

            task = await Tasks.create(task);
            res.status(201).json(task);
          } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Unexpected error'})
          }

      });

    app.route('/tasks/:id')
        .all(app.auth.authenticate())
      .get([
            param('id', 'Not an integer').isInt()
          ], async (req, res) => {
          try {
              const errors = validationResult(req);
              if (!errors.isEmpty()){
                  return res.status(400).json({ errors: errors.array() });
              }
              const task = await Tasks.findByOne({
                  where: {
                    id: req.user.id,
                    user_id: req.user.id
                  }
              });

              if(task) {
                  res.json(task);
              } else {
                  res.sendStatus(404);
              }
          } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Unexpected error'});
          }
      })

      .put([
            param('id', 'Not an integer').isInt(),
            body('title', 'Required field').exists(),
            body('title', 'Invalid length').trim().isLength({min: 1, max: 255}),
            body('done', 'Required field').exists(),
            body('done', 'Not a boolean').isBoolean()
      ], async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()){
                    return res.status(400).json({ errors: errors.array() });
                }
                await Tasks.update(matchedData(req), {
                    where: {
                        id: req.params.id,
                        user_id: req.user.id
                    }
                });
                res.sendStatus(204);
            } catch(error) {
                console.log(error);
                res.status(500).json({msg: 'Unexpected error'});
            }
      })

      .delete([
          param('id', 'Not an integer').isInt()
      ],async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()){
                    return res.status(400).json({ errors: errors.array() });
                }
                await Tasks.destroy({
                    where: {
                        id: req.params.id,
                        user_id: req.user.id
                    }
                });
                res.sendStatus(204);
            } catch (error) {
                console.log(error);
                res.status(500).json({msg: 'Unexpected error'});
            }
      });
};