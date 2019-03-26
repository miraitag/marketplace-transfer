export default class FetchFile{
    constructor(path, config){
        this.path = path;
        this.config = config;
    }

    async loadFile(){
        return fetch(this.path, this.config)
    }
}