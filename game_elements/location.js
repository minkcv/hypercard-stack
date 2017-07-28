
exports.Location = class
{
    constructor(name)
    {
        this.name = name;
        this.views = [];
    }

    AddView(view)
    {
        this.views.push(view);
    }

    GetView(name)
    {
        return this.views.find(v => v.name === name);
    }
}