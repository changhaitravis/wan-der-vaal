'use strict'; 
 
angular.module('wanDerVaal')
.service('iconService', function(){
    
    var images = {};
    var fontIcons = {
        "payment": "fa credit-card",
        "linode": "fa fa-linode",
        "address book": "fa fa-address-book",
        "directory": "fa fa-address-book",
        "database": "fa fa-database",
        "table": "fa fa-database",
        "grid": "fa fa-database",
        "calendar": "fa fa-calendar",
        "git": "fa fa-code-fork",
        "vcard": "fa fa-code-fork",
        "authentication": "fa fa-unlock",
        "identity": "fa fa-id-badge",
        "trust": "fa fa-handshake-o",
        "booking": "fa fa-plane",
        "global": "fa fa-globe",
        "navigation": "fa fa-compass",
        "location": "fa fa-map-marker",
        "time": "fa fa-clock-o",
        "time-tracking": "fa fa-hourglass-2",
        "logistic": "fa fa-truck-o",
        "code": "fa fa-code",
        "archive": "fa fa-archive",
        "data visualization": "fa fa-pie-chart",
        "metrics": "fa fa-area-chart",
        "social-media": "fa fa-hashtag",
        "laptop": "fa fa-laptop",
        "upload": "fa fa-upload",
        "university": "fa fa-university",
        "document": "fa fa-file",
        "currency": "fa fa-dollar",
        "hyperlink": "fa fa-chain",
        "windows": "fa fa-windows",
        "internet explorer": "fa fa-internet-explorer",
        "drupal": "fa fa-drupal",
        "wordpress": "fa fa-wordpress",
        "slack": "fa fa-slack",
        "automation": "fa fa-gears",
        "dashboard": "fa fa-dashboard",
        "data cube": "fa fa-cube",
        "data warehouse": "fa fa-cubes",
        "inbox": "fa fa-inbox",
        "search": "fa fa-search",
        "support": "fa fa-support",
        "shopping": "fa fa-shopping-cart",
        "group": "fa fa-group",
        "user management": "fa fa-user-plus",
        "mail": "fa fa-envelope",
        "data entry": "fa fa-keyboard-o",
        "terminal": "fa fa-terminal",
        "tv": "fa fa-tv"
    };
    
    var fs = require('fs');
    var file = fs.readdirSync(process.cwd() + '/images'); 
    console.log(file); 
    file.map(function(filename){
        var name = filename.split('.');
        name.pop();
        images[name] = filename.toLowerCase();
    });
    
    function getImagePathFor(infoSys){
        //first check for image match.
        if(typeof infoSys.Name === 'string' && images[infoSys.Name.toLowerCase()]){
            return images[infoSys.Name.toLowerCase()];
        }else{
            return null;
        }
    }
    
    function getFontIconFor(infoSys){
        
        //first check for keyword match
        if(typeof infoSys.keywords === 'object'){
            for (var i in infoSys.keywords){
                if(fontIcons[infoSys.keywords[i].toLowerCase()]){
                    return fontIcons[infoSys.keywords[i].toLowerCase()];
                }
            }
        }
        
        //then fallback to checking for front-end thru back-end
        
        if(typeof infoSys.front_end === 'string' && fontIcons[infoSys.front_end.toLowerCase()]){
            return fontIcons[infoSys.front_end.toLowerCase()];
        }else if(typeof infoSys.back_end === 'string' && fontIcons[infoSys.back_end.toLowerCase()]){
            return fontIcons[infoSys.back_end.toLowerCase()];
        }else if(typeof infoSys.data_store === 'string' &&  fontIcons[infoSys.data_store.toLowerCase()]){
            return fontIcons[infoSys.data_store.toLowerCase()];
        }else{
            return null;
        }
    }
    
    this.getIconFor = function(infoSys){
        if(infoSys){
            return {
                "image": getImagePathFor(infoSys), 
                "font": getFontIconFor(infoSys) + " fa-5x" //fa-#x affects the sizing
            };
        }
    };
    
});
