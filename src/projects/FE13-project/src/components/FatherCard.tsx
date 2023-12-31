import {  ClassSprites, SkillIcons } from "../assets/fe-child-files/Awakening-image-library"
import { useContext, useState, useEffect} from 'react'
import { PairingContext } from "./PairingContext"


export const  FatherCard = () => {

  const [onClassTab, setOnClassTab] = useState(true)
  const {fatherData} = useContext(PairingContext)

  const absentFather = fatherData.name === ''
  const avatarParent = fatherData.name === 'AvatarM'
  const classyParent = fatherData.name === 'AvatarM' && onClassTab


  useEffect(() => {
    setOnClassTab(true)
  }, [fatherData.name])

  const tabSelect = (tab:string) =>{
    if(tab === 'classes'){
    setOnClassTab(true)
  }else{
    setOnClassTab(false)
  }
  }



	return (

    <>
      <div className={`absent-parent father-container  ${absentFather? '' : 'hide'}`}>
        <h3>Select a Father</h3>
      </div>

      <div className={`father-container parent-unit ${absentFather ? 'hide' : ''}`}>

        <div className="unit-card-left">
          <div className="portrait-container">
            <img className="portrait" src={fatherData.portrait} alt={`${fatherData.name} Portrait`} />
          </div>

          <div className="name-header">
            <h3>{fatherData.name}</h3>
            <img src={fatherData.sprite} alt="" />
          </div>
        </div>

        <div className="unit-card-right">

          <div className={`btn-tabs ${avatarParent ? '' : 'hide'}`}>
            <button className={`tab ${onClassTab ? '' : 'tab-bottom-border'}`} onClick={()=>tabSelect('classes')}>Classes</button>
            <button className={`tab ${onClassTab ? 'tab-bottom-border' : ''}`} onClick={()=>tabSelect('skills')}>Skills</button>
          </div>

          <div className={`unit-details ${onClassTab ? '' : 'hide'}`}>
              <h3 className={`${avatarParent ? 'hide' : ''}`}>Classes</h3>

            <div className="icons-container">

              {fatherData.classes.map((c, index) => {
                const t = c
                c = ClassSprites[c.replace(/ /g, '') + '_' + fatherData.sex] 
                return(
                <div className="sprite-container" key={index}>
                  <img className="sprite-img"  src={c} alt="class"  />
                  <div className="details">
                    <p>{t}</p>
                  </div>
                </div>)
              })}
            </div>
          </div>


          <div className={`unit-details ${classyParent ? 'hide' : ''} `}>

          <h3 className={`${avatarParent ? 'hide' : ''}`}>Skills</h3>

          <div className="icons-container">

          {fatherData.skills.map((s, index) => {
            const t = s
            const e = SkillIcons[s?.replace('+','Plus').replace(/ /g,'')]?.effect
            s = SkillIcons[s?.replace('+','Plus').replace(/ /g,'')]?.icon
            if(s == undefined) return
            return(
            <div className="sprite-container" key={index}>
              <img className="sprite-img"  src={s} alt="skill" />
              <div className="details">
                <p>{t}</p>{e}
              </div>
            </div>)
          })}
          </div>
        

          </div>
        </div>
      </div>

    </>

	)
}