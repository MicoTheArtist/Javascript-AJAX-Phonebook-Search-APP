<html>

<head>
<style type="text/css">

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  float: left;
  position: relative;
  width: 10em;
}

li ul {
  display: none;
  position: absolute;
  top: 1em;
}

li.dropdown ul { display: block; }

</style>

<script type="text/javascript"> 
<!--

function initializelist(){
           topRoot = document.getElementById("surf");
           for (i=0; i<topRoot.childNodes.length; i++) {
                nodeAt = topRoot.childNodes[i];
                if (nodeAt.nodeName=="LI") {
                    nodeAt.onmouseover=function() {
                         this.className ="dropdown";
                     }
                     nodeAt.onmouseout=function() {
                           this.className="";
                     }
             }
       }
}



window.onload=initializelist;

//-->
</script>

</head>
<body>

<ul id="surf">

  <li>Hounds
    <ul>
      <li><a href="">Bloodhound</a></li>
      <li><a href="">Basset</a></li>
      <li><a href="">Beagle</a></li>
      <li><a href="">Irish Wolfhound</a></li>
    </ul>
  </li>

  <li>Shepherds
    <ul>
      <li><a href="">German Shepherd</a></li>
      <li><a href="">Collie</a></li>
      <li><a href="">Sheepdog</a></li>
    </ul>
  </li>

  <li>Terriers
    <ul>
      <li><a href="">Airedale</a></li>
      <li><a href="">Scottish</a></li>
      <li><a href="">Jack Russell</a></li>
      <li><a href="">Bull Terrier</a></li>
      <li><a href="">Yorkshire</a></li>
    </ul>
  </li>

</ul>


</body>

</html>
