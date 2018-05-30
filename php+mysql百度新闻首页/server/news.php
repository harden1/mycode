<?php
   header("Content-type:application/json;charset=utf-8");
//连接数据库
  require_once('db.php');
if($link){
//    执行成功的过程
    if(is_array($_GET)&&count($_GET)>0){ //先判断是否通过get传值了
    if($_GET['newstype']){
        $newstype=$_GET['newstype'];
        $sql="SELECT * FROM `news` WHERE `newstype`='{$newstype}'";
    mysqli_query($link,"SET NAMES utf8");
    $result= mysqli_query($link,$sql);
    $senddata=array();
    while($row=mysqli_fetch_assoc($result)){
        array_push($senddata,array(
            'id'=>$row['id'],
            'newstype'=>$row['newstype'],
            'newstitle'=>$row['newstitle'],
            'newsimg'=>$row['newsimg'],
            'newstime'=>$row['newstime'],
            'newssrc'=>$row['newssrc']  
        ));
    }
    echo json_encode($senddata);      
    }
    }else{
    $sql='SELECT * FROM news';
    mysqli_query($link,"SET NAMES utf8");
    $result= mysqli_query($link,$sql);
    $senddata=array();
    while($row=mysqli_fetch_assoc($result)){
        array_push($senddata,array(
            'id'=>$row['id'],
            'newstype'=>$row['newstype'],
            'newstitle'=>$row['newstitle'],
            'newsimg'=>$row['newsimg'],
            'newstime'=>$row['newstime'],
            'newssrc'=>$row['newssrc']  
        ));
    }
    echo json_encode($senddata);       
    }     
}else{
    echo json_encode(array('连接信息'=>'连接失败'));
}
//   $arr=array(
//       'newstype'=>'百家',
//       'newsimg'=>'images/2.jpg',
//       'newstime'=>'2016-04-27',
//       'newssrc'=>'极客学院',
//       'newstitle'=>'这个是新闻标题'
//   );
//  echo json_encode($arr);
?>