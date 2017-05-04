var allCurrentModels = [];
var _model = {};

var World = {

   model: {},

    init: function initFn() {
        this.createOverlays();
    },

    createOverlays: function createOverlaysFn() {
        var crossHairsRedImage = new AR.ImageResource("assets/crosshairs_red.png");
        var crossHairsRedDrawable = new AR.ImageDrawable(crossHairsRedImage, 1.0);

        var crossHairsBlueImage = new AR.ImageResource("assets/crosshairs_blue.png");
        var crossHairsBlueDrawable = new AR.ImageDrawable(crossHairsBlueImage, 1.0);

        this.tracker = new AR.InstantTracker({
            onChangedState:  function onChangedStateFn(state) {
            },
            deviceHeight: 1.0
        });

        this.instantTrackable = new AR.InstantTrackable(this.tracker, {
            drawables: {
                cam: crossHairsBlueDrawable,
                initialization: crossHairsRedDrawable
            },
            onTrackingStarted: function onTrackingStartedFn() {
            },
            onTrackingStopped: function onTrackingStoppedFn() {
            },
            onTrackingPlaneClick: function onTrackingPlaneClickFn(xpos, ypos) {
              if(_model.hasOwnProperty('name')) {
                World.addModel(xpos, ypos,_model);
              } else {
                alert("Please select a model");
              }
              // World.addModel(xpos, ypos,model);
            },
          onScaleBegan : function onScaleBeganFn(xpos, ypos) {
            console.log(xpos, ypos);
          },
          onScaleChanged : function onScaleChangedFn(data){
             console.log(data);
          }
        });
    },

    changeTrackerState: function changeTrackerStateFn() {

        if (this.tracker.state === AR.InstantTrackerState.INITIALIZING) {

            document.getElementById("tracking-start-stop-button").src = "assets/buttons/stop.png";
            document.getElementById("tracking-height-slider-container").style.visibility = "hidden";

            this.tracker.state = AR.InstantTrackerState.TRACKING;
        } else {

            document.getElementById("tracking-start-stop-button").src = "assets/buttons/start.png";
            document.getElementById("tracking-height-slider-container").style.visibility = "visible";

            this.tracker.state = AR.InstantTrackerState.INITIALIZING;
        }
    },

    changeTrackingHeight: function changeTrackingHeightFn(height) {
        this.tracker.deviceHeight = parseFloat(height);
    },

    isTracking: function isTrackingFn() {
        return (this.tracker.state === AR.InstantTrackerState.TRACKING);
    },

    addModel: function addModelFn(xpos, ypos, model) {
        if (World.isTracking()) {  //select model from slider
          var modelPath = "assets/models/" + model.name + ".wt3";
          var arModel = new AR.Model(modelPath, {
            scale: {
              x: 0.045,
              y: 0.045,
              z: 0.045
            },
            translate: {
              x: xpos,
              y: ypos
            },
            rotate: {
              z: Math.random() * 360.0
            },
          })

            allCurrentModels.push(arModel);
            this.instantTrackable.drawables.addCamDrawable(arModel);
        }
    },

    resetModels: function resetModelsFn() {
        for (var i = 0; i < allCurrentModels.length; i++) {
            this.instantTrackable.drawables.removeCamDrawable(allCurrentModels[i]);
        }
        allCurrentModels = [];
        _model = {};
    },

    selectModel: function selectmodelFm(e) {
      _model.name = e;
    }
};

World.init();
