import React, { useState, useRef, useEffect, } from 'react';
import TopButtons from "../../../components/TopButtons/TopButtons.js"
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen.js"
import "../../../index.css"
import "./../AugmentedReality.css"
import sondagem4Model from '../../../resources/models/sondagem4.smaller.straight.glb';
import sondagem4Img from '../../../resources/images/alignmentImages/sondagem4C.png';
import { setOrientation, loadModel, handleCleanup, setFullScreen } from '../../../utils/utils.js';
import AligmentButton from '../../../components/AlignmentButton/AligmnentButton.js';

function Sondagem4C({ backUrl }) {
  setOrientation("landscape");
  const [modelAligned, setModelAligned] = useState(false);
  const [model, setModel] = useState(null);
  const [isModelSet, setIsModelSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const entityRef = useRef();
  const entityParentRef = useRef();
  const cameraRef = useRef();
  const [cameraOrientation, setCameraOrientation] = useState(null);

  const [label, setLabel] = useState(null);


  const handleModelAligned = () => {
    setCameraOrientation(cameraRef.current.object3D.rotation.clone());
    setModelAligned(true);
    setLabel("Vista da Retaguarda");
  };

  useEffect(() => {
    localStorage.setItem('sondagem4ARCFlag', 'true');
    localStorage.setItem('hasRefreshed', 'false');

    if (model == null) {
      load3DModel();
    }
    if (modelAligned && model != null) {
      setModelInScene();
    }
  }, [model, modelAligned]);

  // Load model
  const load3DModel = () => {
    loadModel(sondagem4Model)
      .then((loadedModel) => {
        setModel(loadedModel);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading model:', error);
      });
  };

  // Set model
  const setModelInScene = () => {
    if (entityRef.current && cameraRef.current && entityParentRef.current) {

      //model
      entityRef.current.object3D.add(model);
      entityRef.current.object3D.position.set(85, -180, -660);
      entityRef.current.object3D.scale.set(3, 3.33, 3);
      entityRef.current.setAttribute('rotation', '-5 90 10');
      entityParentRef.current.object3D.rotation.set(cameraOrientation.x, cameraOrientation.y, cameraOrientation.z);

      //camera
      cameraRef.current.setAttribute('rotation', '0 0 0');
      setIsModelSet(true)
    }
  };

  const cleanUp = () => {
    handleCleanup(model, entityRef, document.querySelectorAll('a-scene'));
    setModel(null);
    setFullScreen(false, true);
  };


  return (
    <div className="AugmentedReality">
      <TopButtons hideFullScreenButton={true} cleanUp={() => cleanUp()} backUrl={backUrl} label={label} />
      {(isLoading || (!isLoading && modelAligned && !isModelSet)) &&
        <LoadingScreen />}
      {!isLoading &&
        <div className="content">
          <a-scene
            className="scene"
            renderer="antialias: true; logarithmicDepthBuffer: true; colorManagement: false; sortObjects: true;"
            xr-mode-ui='enabled: false'>
            <a-entity position="0 0 0" rotation="0 0 0">
              <a-camera
                ref={cameraRef} look-controls='enabled: true' />
            </a-entity>
            {modelAligned &&
              <a-entity ref={entityParentRef}>
                <a-entity
                  className="model"
                  ref={entityRef}
                  geometry-merger
                  anchored="persistent: true"
                />
              </a-entity>}
          </a-scene>
          {!modelAligned &&
            <div className="alignElements">
              <img className="alignImage" src={sondagem4Img} />
              <AligmentButton onClick={() => handleModelAligned()} />
            </div>}
          {modelAligned && false &&
            <div className="alignElements">
              <img className="alignImage" src={sondagem4Img} />
            </div>}
        </div>}
    </div>
  );
}
export default Sondagem4C;